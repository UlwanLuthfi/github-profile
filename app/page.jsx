"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState();
  const [usersData, setUsersData] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const res = await fetch(
      `https://api.github.com/search/users?q=${username}&per_page=10`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    setUsersData(data["items"]);
  };

  return (
    <main className="flex min-h-screen justify-center items-center p-5">
      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Github Profile</CardTitle>
            <CardDescription>Search your github profile.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSearch}>
            <CardContent>
              <Label className="font-medium text-base" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                placeholder="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Search</Button>
            </CardFooter>
          </form>
        </Card>

        {!usersData.length == 0 && (
          <div className="rounded-lg border shadow-sm">
            <CardContent>
              {usersData.map((user) => {
                return (
                  <div className="flex items-center mt-5" key={user.id}>
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-between w-full">
                      <p className="mx-4 font-medium text-lg">{user.login}</p>
                      <Link
                        href={user.html_url}
                        target="_blank"
                        className={buttonVariants({
                          size: "icon",
                        })}
                      >
                        <ChevronRight />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </div>
        )}
      </div>
    </main>
  );
}
