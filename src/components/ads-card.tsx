import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import ActionTooltip from "./action-tooltip";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const AdsCard = () => {
  return (
    <div className="mt-auto p-4">
      <Card x-chunk="dashboard-02-chunk-0">
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle className="flex items-center">
            Mentor Beta version 0.0.1
            <ActionTooltip text="Hide">
              <Button size={"sm"} variant={"ghost"} onClick={close}>
                <X className="w-4 h-4" />
              </Button>
            </ActionTooltip>
          </CardTitle>
          <CardDescription>
            This is the open-source project for awesome dev community. New
            features and more stable version will be released soon.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default AdsCard;
