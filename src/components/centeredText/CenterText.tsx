import './CenterText.scss'

const CenterText = ({ text }: { text: string }) => {
  return (
    <div className="centered-text">
      <p>{text}</p>
    </div>
  )
}

export default CenterText