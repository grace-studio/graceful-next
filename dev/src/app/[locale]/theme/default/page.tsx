import { Block, Buttons } from '@/components/DemoBlock';
import { ThemePageWrapper } from '@grace-studio/graceful-next/components';

const DemoPage = () => {
  return (
    <ThemePageWrapper>
      <Block id="1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
        <Buttons />
      </Block>
      <Block className="theme-transparent" id="2">
        <img
          className="absolute left-0 h-full object-cover w-full"
          src="https://images.ctfassets.net/hrltx12pl8hq/2RwJp3f9UiCnfWBEunwxOQ/f11257994853124d7b1a6a935e678c13/0_hero.webp"
        />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        enim id error voluptas exercitationem consequatur fugit modi suscipit.
        Asperiores eligendi soluta dolorem quam beatae porro veniam aliquid.
        Accusamus, nam obcaecati.
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
