


import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectBudgetOptions, SelectionTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AI_PROMPT } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import { Axios } from 'axios';
import { setDoc ,doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog]= useState(false);

    const [loading, setLoading]= useState(false);

    const router= useNavigate();

    const handleInputChange = (name, value) => {
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login= useGoogleLogin({
        onSuccess: (codeResp)=>GetUserProfile(codeResp),
        onError:(error)=> console.log(error)
    })

    const OnGenerateTrip=async ()=>{
        
        const user =localStorage.getItem('user');

        if(!user){
            setOpenDialog(true)
            return ;
        }

        if(formData?.noOfDays>10 && !formData?.location || !formData?.budget || !formData?.traveler)
        {
            toast("Please fill all details!")
            return ;
        }
        setLoading(true);
        const FINAL_PROMPT= AI_PROMPT.replace('{location}', formData?.location?.label)
                                    .replace('{totalDays}', formData?.noOfDays)
                                    .replace('{traveler}',formData?.traveler)
                                    .replace('{budget}',formData?.budget)
                                    .replace('{totalDays}',formData?.noOfDays)


        const result= await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text())

        if(name=='noOfDays' &&value>10){
            console.log("Please enter Trip Days less than 10")
            return ;
        }
          
    }

    const SaveAiTrip=async(TripData)=>{

        setLoading(true);
        const user= JSON.parse(localStorage.getItem('user'));
        const docId= Date.now().toString()
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id:docId

          });
          setLoading(false);
          router('/view-trip/'+docId)
    }
    

    const GetUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: `application/json`,
            },
        }).then((resp)=>{
            console.log(resp);
            localStorage.setItem('user',JSON.stringify(resp.data));
            setOpenDialog(false);
            OnGenerateTrip();
        })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
            </p>
            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v); // Ensure this updates the formData with the selected place
                            }
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning for your trip?</h2>
                    <Input
                        placeholder={'Ex.3'}
                        type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}
                            `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectionTravelesList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}
                            `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-10 justify-end flex'>
                <Button 
                disabled={loading}
                onClick={OnGenerateTrip}>
                    {loading?
                    <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:'Generate Trip'
                }
                    </Button>
            </div>
            <Dialog open={openDialog}>
            
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <img src= "/logo.svg"/>
                    <h2 className='font-bold text-lg mt-7'>
                    Sign In with Google</h2>
                    <p>Sign in to the App with Google Authentication securily.</p>
                <Button 
                onClick= {login}
                className="w-full mt-5 flex gap-4 item-center">
                      
                <FcGoogle className='h-7 w-7'/>Sign In with Google
                </Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

        </div>
    );
}

export default CreateTrip;