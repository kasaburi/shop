import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
   
  let token = sessionStorage.getItem("user")
  if (token){
    return true
  }else{
    return false
  }





};
