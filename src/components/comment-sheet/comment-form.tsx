"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { createComment } from "@/firebase/actions/comments-action";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment must be at least 1 characters.",
  }),
});

type CommentFormProps = {
  userId: string;
  userImageUrl: string;
  challengeId: number;
};

const CommentForm = ({
  userId,
  userImageUrl,
  challengeId,
}: CommentFormProps) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.comment === "") return;
    if (!userId || !challengeId) return;
    startTransition(() => {
      createComment({
        comment: values.comment,
        userId,
        userImageUrl,
        challengeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then(() => form.reset())
        .catch((e) => toast.error(e));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-2 w-full "
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl aria-disabled={pending}>
                <Input
                  disabled={pending}
                  placeholder="Comment..."
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={pending}
          type="submit"
          variant={"secondary"}
          size={"sm"}
          className={cn(pending && "pointer-events-none")}
        >
          <Send className="w-4 h-4" />{" "}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
