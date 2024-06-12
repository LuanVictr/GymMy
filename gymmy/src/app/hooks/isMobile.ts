
function checkIsMobile() {
  if(typeof window !== 'undefined') {
    return window.innerWidth < 800;
  }
  return false;
}

export default checkIsMobile;