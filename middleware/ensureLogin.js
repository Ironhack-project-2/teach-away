const ensureLoggedIn = (redirectTo) => {
  return (req, res, next) => {
      if(req.user){
          next();
      }else{
          req.flash('error','You have to login first');
          res.redirect(redirectTo);
      }
  }
}
const ensureLoggedOut = (redirectTo) => {
  return (req, res, next) => {
      if(!req.user){
          next();
      }else{
          req.flash('error','You are logged in, cannot access');
          res.redirect(redirectTo);
      }
  }
}
const isTeacher =  (req, res, next) => {
      if(req.user.isTeacher){
          next();
      }else{
          req.flash('error','You are not the teacher');
          res.redirect(redirectTo);
      }
  }

module.exports = {
  ensureLoggedIn,
  ensureLoggedOut,
  isTeacher
}
