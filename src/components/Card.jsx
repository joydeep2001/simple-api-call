import "../App.css";

export default function Card(props) {
  if (!props.displayData)
    return <div className="sl user-card">Please Click on a button</div>;

  console.log(props.displayData.data);
  const { avatar, first_name, last_name, email } = props.displayData.data;
  return (
    <div className="sl user-card">
      <div className="img-cont">
        <img src={avatar} />
      </div>
      <div className="name">
        <h2>{`${first_name} ${last_name}`}</h2>
      </div>
      <div className="email">
        <i className="fa fa-envelope" aria-hidden="true"></i>
        {`${email}`}
      </div>
    </div>
  );
}
