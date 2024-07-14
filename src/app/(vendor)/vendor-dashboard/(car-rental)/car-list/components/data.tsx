import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const statuses = [
  {
    value: "available",
    label: "Available",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "rented",
    label: "Rented",
    icon: CircleIcon,
  },
  {
    value: "maintenance",
    label: "Maintenance",
    icon: StopwatchIcon,
  },
  {
    value: "reserved",
    label: "Reserved",
    icon: CheckCircledIcon,
  },
  {
    value: "unlisted",
    label: "Unlisted",
    icon: CrossCircledIcon,
  },
]