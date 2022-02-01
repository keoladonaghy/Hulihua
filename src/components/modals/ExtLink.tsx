

type Props = {
    url: string
    text: string
}

export const ExtLink = ({url, text}: Props) => {
    return (
      <a href={url} className="underline font-bold">{text}</a>
    )
  }