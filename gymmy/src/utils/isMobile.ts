function checkIsMobile() {
  if(typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  
}

export default checkIsMobile;