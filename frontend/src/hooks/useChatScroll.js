import React from "react";

function useChatScroll() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            ref.current.scrollTop = ref.current.scrollHeight;
          }
        });
      });

      observer.observe(ref.current, {
        childList: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return ref;
}

export default useChatScroll;
