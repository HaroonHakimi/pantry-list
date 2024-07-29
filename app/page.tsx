"use client";
import { Box, Stack, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const items = [
  "potato",
  "tomato",
  "potato",
  "tomato",
  "potato",
  "tomato",
  "lettuce",
  "ginger",
  "pumpkin",
  "lettuce",
  "ginger",
  "pumpkin",
  "lettuce",
  "ginger",
  "pumpkin",
  "lettuce",
  "ginger",
  "pumpkin",
];

export default function Home() {

  const [pantry, setPantry] = useState<string[]>([])

  useEffect(() => {
    const fetchPantry = async () => {
      const db = collection(firestore, "pantry");
      const snapshot = query(db);
      const docs = await getDocs(snapshot);
      
      const pantryList: string[] = []

      docs.forEach(doc => {
        pantryList.push(doc.id)
      })

      console.log(pantryList)

      setPantry(pantryList)
    };

    fetchPantry()
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width="100vw"
      height="100vh"
      flexDirection={"column"}
    >
      <Box border={"1px solid #333"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"800px"}
          height={"100px"}
          bgcolor={"#ADD8E6"}
        >
          <Typography variant="h2" color={"333"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>

        <Stack
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
          width="800px"
          overflow={"auto"}
          height="500px"
        >
          {pantry.map((i) => (
            <Box
              key={i}
              width="100%"
              height="300px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
            >
              <Typography variant="h3" color={"#333"} textAlign={"center"}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
