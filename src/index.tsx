import { ActionPanel, Detail, List, Action } from "@raycast/api";
import dateFormat from "dateformat";

interface Arguments {
  timestring: string;
}

export default function Command(props: { arguments: Arguments }) {
  const { timestring } = props.arguments;
  let ts = timestring
  if (!timestring){
    ts = new Date().valueOf().toString()
  }
  let timeInt = parseInt(ts);
  timeInt = timeInt < 9999999999 ? timeInt * 1000 : timeInt
  if (!isNaN(timeInt)) {
    let formatList = ['yyyy-mm-dd', 'yyyy-mm-dd HH:MM:ss']
    return (
      <List>
        {formatList.map((format) => {
          const formated = dateFormat(timeInt, format)
          return <List.Item
            key={format}
            icon="list-icon.png"
            title={format}
            subtitle={formated}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="yyyy-MM-dd" content={`${formated}`} />
              </ActionPanel>
            }
          />
        })}
      </List>
    );
  }
  else {
    return (
      <Detail markdown={`# Invalid input

Please enter a number

${ts} is not a number`} />)
  }
}
