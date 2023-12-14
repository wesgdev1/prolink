import "ldrs/cardio";

export const TestComponent = () => {
  return (
    <div className="d-flex flex-column gap-4 align-items-center ">
      <h4>Realiza un test de velocidad</h4>

      <l-cardio size="50" stroke="4" speed="2" color="#7b55fa"></l-cardio>

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
