import React from "react"

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  function handleResize() {
      setWindowWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return windowWidth;
}