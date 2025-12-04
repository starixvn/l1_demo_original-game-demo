import { isMobile } from "react-device-detect";
import Image from "next/image";
import { useBalanceManager } from "@/app/hooks/useBalanceManager";

export default function One2BetHeader() {
  const { getDisplayBalance, getDisplayName } = useBalanceManager();
  return (
    <div
      className={`bg-black text-white h-[69px] md:h-[99px] flex items-center justify-between px-4 md:px-[30px] md:py-[10px] sticky top-0 z-10`}
    >
      <a href={"/"}>
        <Image
          src="/12bet-logo.png"
          alt="logo"
          width={isMobile ? 80 : 141}
          height={0}
        />
      </a>
      <div className="header-btn-group hidden md:block">
        <div className="user-info flex items-center justify-center gap-[6px]">
          <div
            data-ttid="user-info"
            className="info-container flex items-center justify-center gap-[6px]"
          >
            <div className="user-status flex items-center justify-center gap-1">
              <div className="status-content">
                <div className="text">
                  <span>Welcome, </span>
                  <span
                    className="user-mark text-[#d9a728]"
                    data-ttid="user-name"
                  >
                    {getDisplayName()}
                  </span>
                </div>
                <div className="text">
                  <span>Vip Status: </span>
                  <span className="vip-mark text-[#009345]">
                    Black Tortoise
                  </span>
                </div>
              </div>
            </div>
            <div className="balance mr-4 ml-[5px]">
              <button className="px-[10px] py-[5px] rounded-[3px] border border-[#5a5a5a] bg-[#1f1f1f]">
                <span>My Balance: </span>
                <span className="mark">{getDisplayBalance()}</span>
              </button>
            </div>
            <div className="user-profile flex items-center justify-center gap-1">
              <button className="primary bg-[red] rounded-[8px] h-8 px-[10px] py-[5px]">
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="user-function">
          <div className="function-container flex items-center gap-10 text-[#d9a728] text-sm font-semibold">
            <button
              id="DepositBtn-1"
              className="flex items-center justify-center gap-1 uppercase"
            >
              <img
                src="https://banner.picasso12.com/c/d/427773bc22.png?v=0a10a0"
                alt="deposit icon"
              />
              Deposit
            </button>
            <button
              id="WithdrawalBtn-1"
              className="flex items-center justify-center gap-1 uppercase"
            >
              <img
                src="https://banner.picasso12.com/c/d/8209230cc4.png?v=754543"
                alt="withdrawal icon"
              />
              Withdrawal
            </button>
            <button className="flex items-center justify-center gap-1 uppercase">
              <img
                src="https://banner.picasso12.com/c/d/b82291b51f.png?v=d373ae"
                alt="transfer icon"
              />
              Transfer Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
