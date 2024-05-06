
function checkIsMobile() {
  if(typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }

  return false;
}

export default checkIsMobile;