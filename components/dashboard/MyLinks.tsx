"use client";

import {
  Link as LinkIcon,
  FileText,
  HelpCircle,
  Users,
  UserCircle,
  PaintRoller,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

type Props = {};

const links = [
  {
    id: 1,
    title: "Documents",
    subtitle: "Statements & Bank Letters",
    icon: FileText,
    href: "/documents",
  },
  {
    id: 2,
    title: "Query Tracker",
    subtitle: "Track Queries",
    icon: HelpCircle,
    href: "/query-tracker",
  },
  {
    id: 3,
    title: "Roles & Permissions",
    subtitle: "Invite & Set User Access",
    icon: Users,
    href: "/roles-permissions",
  },
  {
    id: 4,
    title: "Manage Profile",
    subtitle: "Notification & device preferences",
    icon: UserCircle,
    href: "/manage-profile",
  },
  {
    id: 5,
    title: "Customise Appearance",
    subtitle: "Personalise Layout & Look",
    icon: PaintRoller,
    href: "/customise-appearance",
  },
];

function MyLinks({}: Props) {
  return (
    <Card className="bg-gray-50">
    <CardHeader
        icon={<LinkIcon className="w-5 h-5 text-primary" strokeWidth={2} />}
        title="My links"
      />

      <CardBody>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-primary">
                    {link.title}
                  </h3>
                  <p className="text-xs text-gray-600">{link.subtitle}</p>
                </div>
              </div>
              <ChevronRight
                className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                strokeWidth={2}
              />
            </button>
          );
        })}
      </CardBody>

      <CardFooter>
        <button className="w-full text-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center justify-center gap-1">
          EDIT LINKS
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </CardFooter>
    </Card>
  );
}

export default MyLinks;
