"use client";

import { Chip, Image, Link } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import Leaderboard from "@/components/Leaderboard";
import RegionalChampions from "@/components/RegionalChampions";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { LogoutButton } from "@/components/auth/logout-button";

const Profile = () => {
  const user = useCurrentUser();

  // Function to determine user level based on points
  const getUserLevel = (points) => {
    if (points < 100) return "Novice Rider";
    if (points <= 200) return "Expert Rider";
    if (points <= 300) return "Boda Master";
    if (points <= 400) return "Bike Shujaa";
    if (points <= 500) return "Highway Hero";
    return "Boda Legend";
  };

  return (
    <div className="container-fluid mx-auto p-3 space-y-6 mb-12">
      <div className="flex flex-col mt-6 items-center justify-center min-h-72 mb-6 rounded-xl">
        <div className="border-2 border-emerald-500 p-1 mb-4 rounded-full">
          <Image
            src={user.image || "/images/avatarPlaceholder.png"}
            alt="avatar"
            height={100}
            width={100}
            className="rounded-full object-cover"
          />
        </div>
        <p className="mt-4 text-xl text-slate-900 font-bold">{user.username}</p>
        <Chip
          startContent={<DotFilledIcon className="text-emerald-500 h-8 w-8" />}
          className="bg-emerald-100 font-semibold text-emerald-700 mt-4"
        >
          Active Member
        </Chip>

        <div className="w-full grid grid-cols-2 gap-2 mt-6 mb-3">
          <RoleGate allowedRole={UserRole.USER || UserRole.CHAIRMAN}>
            <div className="bg-white shadow-sm border border-emerald-100 flex flex-row p-4 rounded-xl gap-4 items-center justify-center">
              <Image
                src="/images/trophy.png"
                alt="icon"
                width={50}
                height={50}
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm font-semibold">Points</p>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-sky-500 to-emerald-500 animate-text">
                  {user.points}
                </p>
              </div>
            </div>
            <div className="bg-white shadow-sm flex flex-row border border-emerald-100 p-4 rounded-xl gap-4 items-center justify-center">
              <Image
                src="/images/medal.png"
                alt="icon"
                width={50}
                height={50}
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm font-semibold">Level</p>
                <p className="text-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-500 to-emerald-500 animate-text">
                  {getUserLevel(user.points)}
                </p>
              </div>
            </div>
          </RoleGate>
        </div>
      </div>

      <RoleGate allowedRole={UserRole.USER}>
        <Link
          className="bg-[#006fee] flex flex-wrap p-2 text-center justify-center text-white text-sm rounded-lg"
          href="https://whatsapp.com/channel/0029VaphVzyKLaHuuL3S8k1J"
        >
          Join Our WhatsApp
        </Link>
      </RoleGate>

      <RoleGate allowedRole={UserRole.ADMIN}>
        <Link
          href="/addpost"
          className="bg-[#006fee] flex flex-wrap p-2 text-center justify-center text-white text-sm rounded-lg"
        >
          Add News Post
        </Link>
        <Link
          href="/addtask"
          className="bg-[#006fee] flex flex-wrap p-2 text-center justify-center text-white text-sm rounded-lg"
        >
          Add News Task
        </Link>
      </RoleGate>

      <RoleGate allowedRole={UserRole.CHAIRMAN}>
        <div className="grid grid-cols-2 items-center gap-4 mb-12">
          <Button className="bg-[#006fee] flex flex-wrap p-2 text-center justify-center text-white text-sm rounded-lg">
            Add Stage
          </Button>
          <Button className="bg-[#006fee] flex flex-wrap p-2 text-center justify-center text-white text-sm rounded-lg">
            Add Stage Members
          </Button>
        </div>
      </RoleGate>

      <RoleGate allowedRole={UserRole.USER}>
        <Leaderboard />
        <RegionalChampions />
      </RoleGate>

      <LogoutButton>
        <Button className="w-full mt-12 mb-12 bg-destructive/15 text-red-600 hover:bg-destructive/20">
          Logout
        </Button>
      </LogoutButton>
    </div>
  );
};

export default Profile;
