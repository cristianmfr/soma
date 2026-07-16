import { Card, CardDescription, CardHeader, CardTitle } from "@soma/ui/card";

export function VerifyEmail() {
  return (
    <div className="relative flex min-h-screen items-center bg-foreground dark:bg-background">
      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-0 md:py-20">
        <Card className="relative px-6 py-8 sm:p-12">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="flex flex-col gap-1">
              <CardTitle className="font-medium text-2xl text-card-foreground">
                Verify your email
              </CardTitle>
              <CardDescription className="font-normal text-muted-foreground text-sm">
                An activation link has been sent to your email address:
                hello@example.com. Please check your inbox and click on the link
                to complete the activation process.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
