import { Block, Buttons } from '@/components/DemoBlock';
import { ThemePageWrapper } from '@grace-studio/graceful-next/components';

const DemoPage = () => {
  return (
    <ThemePageWrapper theme="transparent">
      <Block className="theme-transparent" id="2" bg>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
      </Block>
      <Block id="1" className="theme-light">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
        <Buttons />
      </Block>
      <Block className="theme-dark" id="3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
        <Buttons />
      </Block>
    </ThemePageWrapper>
  );
};

export default DemoPage;
