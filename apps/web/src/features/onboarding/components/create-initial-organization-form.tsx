import { Button } from "@soma/ui/components/button";
import { Input } from "@soma/ui/components/input";
import { Field, FieldGroup, FieldLabel } from "@soma/ui/field";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { useZodForm } from "@/hooks/use-zod-form";
import {
  createInitialOrganization,
  createInitialOrganizationSchema,
} from "../api/create-initial-organization";

export function CreateInitialOrganizationForm() {
  const { control, handleSubmit } = useZodForm(
    createInitialOrganizationSchema,
    {
      defaultValues: {
        name: "",
        slug: "",
      },
    },
  );

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await createInitialOrganization(formData);
      toast.success("Organization created successfully!");
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.error(error);
    }
  });

  return (
    <div className="flex w-full flex-col gap-6 *:selection:bg-primary/75">
      <form
        id="onboarding.create-organization.form"
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-4"
      >
        <FieldGroup>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="Organization Name"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="slug"
            render={({ field }) => (
              <Field>
                <FieldLabel>Slug</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="organization-name"
                  autoComplete="off"
                  autoFocus={false}
                  className="h-9"
                />
              </Field>
            )}
          />
        </FieldGroup>

        <Field>
          <Button
            type="submit"
            form="onboarding.create-organization.form"
            className="h-9 w-full"
          >
            Create
          </Button>
        </Field>
      </form>
    </div>
  );
}
