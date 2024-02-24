import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try{
    const saltRounds = 10;  
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  catch(err){
    console.log(err);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try{
    const match = await bcrypt.compare(password, hashedPassword);
    if(match){
      return true;
    }
    else{
      return false;
    }
  }
  catch(err){
    console.log(err);
  }
}