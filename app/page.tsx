"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

type PantryItem = {
  name: string;
  count: number
};

export default function Home() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");

  const db = collection(firestore, "pantry");

  const fetchPantry = async () => {
    const snapshot = query(db);
    const docs = await getDocs(snapshot);

    const pantryList: PantryItem[] = [];

    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        count: doc.data().count || 0, // Ensure count is read from the document
        ...doc.data(),
      } as PantryItem);
    });

    setPantry(pantryList);
  };

  const addItem = async (value: string) => {
    const docRef = doc(collection(firestore, 'pantry'), value);

    const docSnap = await getDoc(docRef); // Use getDoc for a single document

    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})

    } else {
      await setDoc(docRef, { count: 1 });
    }

    await fetchPantry();
  };

  const removeItem = async (value: string) => {
    const docRef = doc(collection(firestore, "pantry"), value);
    const docSnap = await getDoc(docRef); // Use getDoc for a single document
  
    if (docSnap.exists()) {
      const data = docSnap.data();
      const count = data.count;
      if (count === 1) await deleteDoc(docRef);
      else await setDoc(docRef, { count: count - 1 });
    }
  
    await fetchPantry();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    display: "flex",
    flexDirection: "column",
    boxShadow: 24,
    p: 4,
    gap: 3,
  };

  useEffect(() => {
    fetchPantry();
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width="100vw"
      height="100vh"
      flexDirection={"column"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item
          </Typography>
          <Stack direction={"row"} spacing={2} width={"100%"}>
            <TextField
              id="outlined-basic"
              label="Pantry Item"
              variant="outlined"
              fullWidth
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />

            <Button
              onClick={() => {
                addItem(item);
                setItem("");
                handleClose();
              }}
              variant="outlined"
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button onClick={() => handleOpen()} variant="contained">
        Add
      </Button>
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
          {pantry.map((item, index) => (
            <Box
              width="100%"
              key={index}
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingY={5}
            >
              <Typography variant="h3" color={"#333"} textAlign={"center"}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>

              <Typography variant="h3" color={'#333'} textAlign={'center'}>
                Quantity: {item.count} {/* Display the count here */}
              </Typography>
              <Button
                variant="contained"
                onClick={() => removeItem(item.name)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
