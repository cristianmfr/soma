import { createFileRoute } from "@tanstack/react-router";
import { CreateInitialOrganizationForm } from "@/features/onboarding/components/create-initial-organization-form";

export const Route = createFileRoute("/_private/_app/onboarding/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h3 className="select-none">Create your first organization</h3>
      </div>
      <div className="flex w-full max-w-72 flex-col">
        <CreateInitialOrganizationForm />
      </div>
    </div>
  );
}
