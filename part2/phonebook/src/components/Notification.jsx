const Notification = ({message}) => {

    const notiStyle = {
        backgroundColor: '#f0efed',
        color: '#47e324',
        border: '2px solid green',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15
    }
    if (message === null) {
      return null
    }
    return (
      <div style={notiStyle}>
        {message}
      </div>
    )
  }

export default Notification