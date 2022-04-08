export default function ButtonTray(props) {
  const { users, onClick, selectedId } = props;

  const handleClick = e => {
    onClick(e);
  };

  return (
    <div className="button-tray" onClick={handleClick}>
      {users.map(user => {
        let className = "btn-sm";
        if (selectedId && selectedId == user.id) className += " bg-blue";
        return (
          <button className={className} key={user.id} id={user.id}>
            {user.id}
          </button>
        );
      })}
    </div>
  );
}
