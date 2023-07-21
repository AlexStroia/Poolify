interface TabPanelContentProps {
  value: number;
  index: number;
  component: React.ReactElement;
}

export const TabPanelContent: React.FC<TabPanelContentProps> = ({
  value,
  index,
  component,
}) => {
  return <div hidden={value !== index}>{component}</div>;
};
