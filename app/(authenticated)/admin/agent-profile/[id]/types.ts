interface Agent {
  _id: string;
  referral_code: string;
  data: {
    agent_id: AgentDetails;
  };
}

interface AgentDetails {
  _id?: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  profile_picture: string;
  profile_picture_preview: string;
  license_number: string;
  agency_name: string;
  agency_address: string;
  years_of_experience: number;
  specializations: string;
  government_id: string;
  linked_in_profile: string;
  website: string;
  marketing_preferences: boolean;
  preferred_communication_channels: string;
  languages_spoken: string;
  service_areas: string;
  professional_bio: string;
  certifications_awards: string;
  references: string;
}

export type { Agent, AgentDetails };
