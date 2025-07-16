// app/auth/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from '../components/auth-form'

export default function AuthPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="signin" 
           className="text-gray-800 data-[state=active]:text-green data-[state=active]:font-semibold">
            Log In</TabsTrigger>
          <TabsTrigger value="signup"  className="text-gray-800 data-[state=active]:text-red data-[state=active]:font-semibold"
          >Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <AuthForm type="signin" />
        </TabsContent>
        <TabsContent value="signup">
          <AuthForm type="signup" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
