export const TestComponent = () => {
  return (
    <div className="d-flex flex-column gap-4 align-items-center ">
      <h1>Test de velocidad</h1>

      <div
        style={{
          width: "60%",
          height: "0",
          paddingBottom: "50%",
          position: "relative",
        }}
      >
        <iframe
          style={{
            borderRadius: "50px",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "50%",

            overflow: "hidden !important",
          }}
          src="//openspeedtest.com/Get-widget.php"
        ></iframe>
      </div>
    </div>
  );
};
