const intersectionObserver = (target, options = {}) => {
  const sun = target.querySelector("#sun");
  const horizon = target.querySelector("#horizon");
  const reflection = target.querySelector("#reflection");

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      console.log("observer callback");
      console.log("is intersecting:", entry.isIntersecting);
      console.log(entry.boundingClientRect);
      console.log(entry.intersectionRect);
      if (entry.isIntersecting) {
        console.log(sun);
      }
    });
  };

  return new IntersectionObserver(callback, options);
};

export default intersectionObserver;
