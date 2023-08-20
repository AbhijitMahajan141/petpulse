type ValidatorProps={
    petName: string,
    ownersName: string,
    email:string,
    address:string,
    password:string,
    // [key: string]: any,
    // [key: number]: any,
}

const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isPasswordValid = (password: string): boolean => {
  // Password validation logic
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

const isTextValid = (name: string):boolean => {
    const textRegex = /^[a-zA-Z\s]{2,}$/;
    return textRegex.test(name);
}

export const Validator = ({petName,ownersName,address, email,password}:ValidatorProps)=>{
    if(petName && !isTextValid(petName)){
        return "Pet name should be in characters and must be atleast 2 characters long."
     }else if(ownersName && !isTextValid(ownersName)){
        return "Owners name should be in characters and must be atleast 2 characters long."
     }else if(email && !isEmailValid(email)){
        return "Invalid Email address! Must contain @ and .";
     }else if(password && !isPasswordValid(password)){
        return "Invalid Password! Must be atleast 6 digit's and contain a Character, a Digit and a Special Character."
     }else{
        return true;
     }
}