import "../App.css";

export default function SkeletonLoader(props) {
  return (
    <>
      <div className="sl user-card">
        <div className="img-cont skeleton-loader"></div>

        <div className="name-sk skeleton-loader"></div>

        <div className="email-sk skeleton-loader"></div>
      </div>
      <div className="button-tray">
        {[1, 2, 3].map(id => {
          return <button className={`jump${id}`} key={id} id={id}></button>;
        })}
      </div>
    </>
  );
}
