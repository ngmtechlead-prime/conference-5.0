import { z } from "zod";

export const caseStudySchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  gender: z.enum(["Female", "Male"], {
    message: "Please select your gender",
  }),
  age: z.enum(["16 - 20", "20 - 25", "25 - 30", "30 - 35"], {
    message: "Please select your age range",
  }),
  hasAnalysedCase: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  hasParticipatedInNGMCaseStudy: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  isCommittingToMeetings: z.enum(["Yes", "No"], {
    message: "Please confirm your commitment",
  }),
  hasRegisteredForConference: z.enum(["Yes", "No"], {
    message: "Please indicate if you have registered",
  }),
  ticketId: z.string().min(1, "Ticket ID is required"),
  comments: z.string().optional(),
});

export type CaseStudyFormData = z.infer<typeof caseStudySchema>;
