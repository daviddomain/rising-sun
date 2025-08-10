const registerCustomCssProps = () => {
  const customCssProperties = [
    {
      name: "--sun-gradient-y",
      syntax: "<percentage>",
      inherits: false,
      initialValue: "200%",
    },
    {
      name: "--sun-gradient-x",
      syntax: "<percentage>",
      inherits: false,
      initialValue: "5%",
    },
  ];
  if (CSS?.registerProperty) {
    try {
      customCssProperties.forEach((prop) => CSS.registerProperty(prop));
    } catch {}
  }
};

export default registerCustomCssProps;
