import { ThumbUpIcon, XIcon, MailIcon } from "@heroicons/react/solid";

export default function Toast(props) {
  //decide message to set
  const message =
    props.success === true
      ? props.successText
      : props.success === false
      ? props.failureText
      : props.success === props.extraErrorCondition
      ? props.extraErrorText
      : null;
  //decide icon to set
  const icon =
    props.success === true ? (
      <ThumbUpIcon />
    ) : props.success === false ? (
      <XIcon />
    ) : props.success === props.extraErrorCondition ? (
      <MailIcon />
    ) : null;
  const attr =
    "flex items-center p-4 w-full max-w-xs shadow " +
    (props.success === true
      ? "text-white bg-green dark:text-white dark:bg-green"
      : props.success === false || props.success === props.extraErrorCondition
      ? "text-white bg-red dark:text-white dark:bg-red"
      : null);
  //render toast only if success is true or false
  if (
    props.success === true ||
    props.success === false ||
    props.success === props.extraErrorCondition
  ) {
    return (
      <div id="toast-default" className={attr} role="alert">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg shadow-md bg-red-100">
          {icon}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
      </div>
    );
  }
}
