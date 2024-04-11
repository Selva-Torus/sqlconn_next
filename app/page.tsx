"use client";
import { getAllRealm , getClientcredentials } from "@/utils/utilsFunctions";
import { useEffect, useMemo, useState } from "react";
import {NextUIProvider, Select, SelectItem} from "@nextui-org/react";

type Realm = {
  id : string,
  name : string
}

export default function Home() {
  const [realmList, setRealmList] = useState<Realm[] |any[]>([]);
  const [realmId , setRealmId] = useState<string>('')

  const handletableData = async () => {
    try {
      const res = await getAllRealm();
      res.status == 200 ? setRealmList(res.data) : setRealmList([]);
    } catch (err) {
      console.log("Error occured");
    }
  };

  const handleSelectRealm = async(e: any) => {
    setRealmId(Array.from(e)[0] as string)
  }

  const handleClientCredentials = async() => {
    const res = await getClientcredentials(realmId)
    console.log(res , "res");
  }

  useEffect(()=> {
    handleClientCredentials()
  }, [realmId])

console.log(realmId);

  
  
  
  return (
    <NextUIProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button onClick={handletableData}>GetAllData</button>
        {realmList.length && 
           <Select 
           label="Select Realm" 
           className="max-w-xs" 
           onSelectionChange={handleSelectRealm}
         >
           {realmList.map((realm) => (
             <SelectItem key={realm.id} value={realm.id}>
               {realm.name}
             </SelectItem>
           ))}
         </Select>

}
      </div>
    </main>
    </NextUIProvider>
  );
}
