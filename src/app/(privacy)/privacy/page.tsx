import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy",
};

const PrivacyPage = () => {
  return (
    <div className="p-8 sm:px-16 md:px-24 ">
      <h1 className="text-3xl mb-4">Privacy Policy for Mentor</h1>
      <p className="text-xl">
        Welcome to Mentor! This Privacy Policy is designed to help you
        understand how Mentor collects, uses, and safeguards your personal
        information. We respect your privacy and are committed to protecting
        your data. By using Mentor, you agree to the terms outlined in this
        Privacy Policy. If you do not agree with these terms, please refrain
        from using our services.
      </p>

      <h2 className="text-2xl m-4">1. Information We Collect</h2>

      <p className="text-xl">
        1.1 Personal Information when you sign up for Mentor, we collect
        personal information for your sign provider such as Google, GitHub,
        Facebook. When use profile image, email, etc that provide from Clerk
        OAuth.
      </p>

      <h2 className="text-2xl m-4">2. How We Use Your Information</h2>

      <p className="text-xl">
        2.1 Providing and Improving Services We use the collected information to
        provide and enhance Mentor&apos;s features, personalize content, and
        improve user experience.
      </p>

      <h2 className="text-2xl m-4">3. How We Share Your Information</h2>

      <p className="text-xl">
        3.1 Third-Party Service Providers We may share your information with
        trusted third-party service providers to assist us in delivering and
        improving our services. These providers are bound by confidentiality
        agreements and are not allowed to use your information for any purpose
        other than providing services to Mentor.
      </p>

      <h2 className="text-2xl m-4">4. Security</h2>

      <p className="text-xl">
        We take reasonable measures to protect your personal information from
        unauthorized access, disclosure, alteration, and destruction. However,
        no method of transmission over the internet or electronic storage is
        completely secure.
      </p>
      <div className="flex justify-center items-center flex-col mt-5">
        <h2 className="text-2xl m-4 text-center font-semibold">Thank you!</h2>
        <Link className="mt-4 underline " href={"/"}>
          Back To Home Page
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPage;
