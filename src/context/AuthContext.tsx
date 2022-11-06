import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseconfig";


// interface appContext extends User {}

export const AuthContext = React.createContext<User | null> (null);



