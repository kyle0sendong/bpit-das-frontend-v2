import { ScrollArea, Paper } from '@mantine/core';
import { LinksGroup } from "../links-group/NavbarLinksGroup";
import classes from './NavbarNested.module.css';

type LinksGroupProps = {
  icon: React.FC<any>;
  label: string;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

type NavbarNestedProps = {
  linksData: LinksGroupProps[]
}

export default function NavbarNested({linksData}: NavbarNestedProps) {

  const links = linksData.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Paper shadow="md" mih="200px" w="20%" ml="xs" mt="xs">
      <nav className={classes.navbar}>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
    </Paper>

  );
}