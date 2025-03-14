import { Block, Buttons } from '@/components/DemoBlock';
import Splitter from '@/components/Splitter';
import { ThemePageWrapper } from '@grace-studio/graceful-next/components';

const DemoPage = () => {
  return (
    <ThemePageWrapper theme="dark">
      <Block id="1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
        <Buttons />
      </Block>
      <Block className="theme-transparent" id="2" bg>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
      </Block>

      <Splitter
        content={[
          <Block className="theme-light" id="3" key={'split-1'}>
            <h3 className="text-lg">Light</h3>
            <Buttons />
          </Block>,
          <Block className="theme-dark" id="3" key={'split-2'}>
            <h3 className="text-lg">Dark</h3>
            <Buttons />
          </Block>,
        ]}
      />

      <Block className="theme-light" id="3">
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
