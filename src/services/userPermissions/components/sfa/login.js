
// loginType ==> phone,userId,otp,fingerPrint

export function loginType(name, props) {
    const loginTypes = {
      phone                 :   true,
      userId                :   true,
      otp                   :   true,
      fingerPrint           :   true
    };
  
    return loginTypes[name];
  }