import { type ChangeEvent, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  getLgasForState,
  NIGERIA_STATE_OPTIONS,
} from "@/lib/constants/nigeria-locations";
import { VOLUNTEER_APPLICANT_CATEGORY_OPTIONS } from "@/lib/constants/volunteer-interest";
import type { VolunteerInterestInput } from "@/types/volunteer-interest";
import {
  SectionHeading,
  VolunteerInterestField,
  volunteerControlClass,
  volunteerDescribedBy,
  volunteerFieldId,
} from "@/components/volunteer-interest/VolunteerInterestField";

function emptyToUndefined(value: unknown) {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

export function AboutYouSection() {
  const {
    register,
    control,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<VolunteerInterestInput>();
  const state = useWatch({ control, name: "state" });
  const applicantCategory = useWatch({
    control,
    name: "applicantCategory",
  });
  const address = useWatch({ control, name: "address" }) ?? "";
  const lgas = useMemo(() => getLgasForState(state ?? ""), [state]);
  const stateField = register("state");

  function handleStateChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value !== state) {
      const hadSelectedLga = Boolean(getValues("lga"));
      setValue("lga", "", {
        shouldDirty: hadSelectedLga,
        shouldTouch: false,
        shouldValidate: false,
      });
      clearErrors("lga");
    }

    void stateField.onChange(event);
  }

  return (
    <section aria-labelledby="about-you-heading" className="space-y-6">
      <SectionHeading
        number={1}
        id="about-you-heading"
        title="About you"
        description="Tell us how to contact you and where you would be volunteering from. Fields marked with an asterisk are required."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <VolunteerInterestField
          name="firstName"
          label="First name"
          required
          error={errors.firstName?.message}
        >
          <input
            {...register("firstName")}
            id={volunteerFieldId("firstName")}
            type="text"
            autoComplete="given-name"
            maxLength={80}
            required
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "firstName",
              error: errors.firstName?.message,
            })}
            className={volunteerControlClass(Boolean(errors.firstName))}
          />
        </VolunteerInterestField>

        <VolunteerInterestField
          name="lastName"
          label="Last name"
          required
          error={errors.lastName?.message}
        >
          <input
            {...register("lastName")}
            id={volunteerFieldId("lastName")}
            type="text"
            autoComplete="family-name"
            maxLength={80}
            required
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "lastName",
              error: errors.lastName?.message,
            })}
            className={volunteerControlClass(Boolean(errors.lastName))}
          />
        </VolunteerInterestField>

        <VolunteerInterestField
          name="email"
          label="Email address"
          required
          hint="We will use this address for application updates."
          error={errors.email?.message}
        >
          <input
            {...register("email")}
            id={volunteerFieldId("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "email",
              error: errors.email?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.email))}
          />
        </VolunteerInterestField>

        <VolunteerInterestField
          name="phoneNumber"
          label="WhatsApp phone number"
          required
          hint="Use a Nigerian mobile number in the format +2348138021890."
          error={errors.phoneNumber?.message}
        >
          <input
            {...register("phoneNumber")}
            id={volunteerFieldId("phoneNumber")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+2348138021890"
            pattern="[+]234[789][0-9]{9}"
            minLength={14}
            maxLength={14}
            required
            aria-invalid={errors.phoneNumber ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "phoneNumber",
              error: errors.phoneNumber?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.phoneNumber))}
          />
        </VolunteerInterestField>

        <VolunteerInterestField
          name="state"
          label="State"
          required
          error={errors.state?.message}
        >
          <select
            {...stateField}
            id={volunteerFieldId("state")}
            onChange={handleStateChange}
            autoComplete="address-level1"
            defaultValue=""
            required
            aria-invalid={errors.state ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "state",
              error: errors.state?.message,
            })}
            className={volunteerControlClass(Boolean(errors.state))}
          >
            <option value="" disabled>
              Select your state or the FCT
            </option>
            {NIGERIA_STATE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </VolunteerInterestField>

        <VolunteerInterestField
          name="lga"
          label="Local government area (LGA)"
          required
          hint={state ? "Choose the LGA that matches your location." : undefined}
          error={errors.lga?.message}
        >
          <select
            {...register("lga")}
            id={volunteerFieldId("lga")}
            autoComplete="address-level3"
            defaultValue=""
            disabled={!state}
            required
            aria-invalid={errors.lga ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "lga",
              error: errors.lga?.message,
              hint: Boolean(state),
            })}
            className={volunteerControlClass(Boolean(errors.lga))}
          >
            <option value="" disabled>
              {state ? "Select your LGA" : "Select a state first"}
            </option>
            {lgas.map((lga) => (
              <option key={lga.id} value={lga.id}>
                {lga.name}
              </option>
            ))}
          </select>
        </VolunteerInterestField>

        <VolunteerInterestField
          name="city"
          label="City, town, or community"
          required
          error={errors.city?.message}
        >
          <input
            {...register("city")}
            id={volunteerFieldId("city")}
            type="text"
            autoComplete="address-level2"
            maxLength={100}
            required
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "city",
              error: errors.city?.message,
            })}
            className={volunteerControlClass(Boolean(errors.city))}
          />
        </VolunteerInterestField>
      </div>

      <VolunteerInterestField
        name="address"
        label="Residential/contact address"
        required
        hint="We collect your full address only to assess volunteer logistics, proximity, and safe deployment planning. It is restricted to authorised NGM staff and is not placed in public URLs or analytics."
        counter={`${address.length}/250 characters`}
        error={errors.address?.message}
      >
        <textarea
          {...register("address")}
          id={volunteerFieldId("address")}
          autoComplete="street-address"
          rows={3}
          maxLength={250}
          required
          aria-invalid={errors.address ? true : undefined}
          aria-describedby={volunteerDescribedBy({
            name: "address",
            error: errors.address?.message,
            hint: true,
            counter: true,
          })}
          className={`${volunteerControlClass(Boolean(errors.address))} resize-y`}
        />
      </VolunteerInterestField>

      <div className="grid gap-5 sm:grid-cols-2">
        <VolunteerInterestField
          name="applicantCategory"
          label="Applicant category"
          required
          error={errors.applicantCategory?.message}
        >
          <select
            {...register("applicantCategory")}
            id={volunteerFieldId("applicantCategory")}
            defaultValue=""
            required
            aria-invalid={errors.applicantCategory ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "applicantCategory",
              error: errors.applicantCategory?.message,
            })}
            className={volunteerControlClass(Boolean(errors.applicantCategory))}
          >
            <option value="" disabled>
              Select your category
            </option>
            {VOLUNTEER_APPLICANT_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </VolunteerInterestField>

        {applicantCategory === "OTHER" ? (
          <VolunteerInterestField
            name="applicantCategoryOther"
            label="Please specify your category"
            required
            error={errors.applicantCategoryOther?.message}
          >
            <input
              {...register("applicantCategoryOther")}
              id={volunteerFieldId("applicantCategoryOther")}
              type="text"
              maxLength={100}
              required
              aria-invalid={errors.applicantCategoryOther ? true : undefined}
              aria-describedby={volunteerDescribedBy({
                name: "applicantCategoryOther",
                error: errors.applicantCategoryOther?.message,
              })}
              className={volunteerControlClass(
                Boolean(errors.applicantCategoryOther),
              )}
            />
          </VolunteerInterestField>
        ) : null}

        <VolunteerInterestField
          name="affiliationName"
          label="School, organisation, or place of work"
          hint="Optional"
          error={errors.affiliationName?.message}
        >
          <input
            {...register("affiliationName", { setValueAs: emptyToUndefined })}
            id={volunteerFieldId("affiliationName")}
            type="text"
            autoComplete="organization"
            maxLength={150}
            aria-invalid={errors.affiliationName ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "affiliationName",
              error: errors.affiliationName?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.affiliationName))}
          />
        </VolunteerInterestField>

        <VolunteerInterestField
          name="courseOrJobTitle"
          label="Course of study or job title"
          hint="Optional"
          error={errors.courseOrJobTitle?.message}
        >
          <input
            {...register("courseOrJobTitle", { setValueAs: emptyToUndefined })}
            id={volunteerFieldId("courseOrJobTitle")}
            type="text"
            autoComplete="organization-title"
            maxLength={120}
            aria-invalid={errors.courseOrJobTitle ? true : undefined}
            aria-describedby={volunteerDescribedBy({
              name: "courseOrJobTitle",
              error: errors.courseOrJobTitle?.message,
              hint: true,
            })}
            className={volunteerControlClass(Boolean(errors.courseOrJobTitle))}
          />
        </VolunteerInterestField>
      </div>
    </section>
  );
}
