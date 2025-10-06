import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [cookies, setCookies] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10)
  const [autoClickers, setAutoClickers] = useState(0)
  const [autoClickerCost, setAutoClickerCost] = useState(25)

  useEffect(() => {
    if (autoClickers === 0) return

    const interval = window.setInterval(() => {
      setCookies((prev) => prev + autoClickers)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [autoClickers])

  const cookiesPerSecond = useMemo(() => autoClickers, [autoClickers])

  const handleCookieClick = () => {
    setCookies((prev) => prev + clickPower)
  }

  const handleBuyClickUpgrade = () => {
    if (cookies < clickUpgradeCost) return

    setCookies((prev) => prev - clickUpgradeCost)
    setClickPower((prev) => prev + 1)
    setClickUpgradeCost((prev) => Math.ceil(prev * 1.5))
  }

  const handleBuyAutoClicker = () => {
    if (cookies < autoClickerCost) return

    setCookies((prev) => prev - autoClickerCost)
    setAutoClickers((prev) => prev + 1)
    setAutoClickerCost((prev) => Math.ceil(prev * 1.6))
  }

  const formatNumber = (value: number) => value.toLocaleString()

  return (
    <div className="app-container">
      <header>
        <h1>Cookie Craze</h1>
        <p className="tagline">
          點擊超大餅乾、購買升級，打造屬於你的小小烘焙王國！
        </p>
      </header>

      <section className="scoreboard" aria-live="polite">
        <div>
          <span className="score-label">餅乾</span>
          <span className="score-value">{formatNumber(cookies)}</span>
        </div>
        <div>
          <span className="score-label">每次點擊</span>
          <span className="score-value">+{formatNumber(clickPower)}</span>
        </div>
        <div>
          <span className="score-label">每秒產量</span>
          <span className="score-value">+{formatNumber(cookiesPerSecond)}</span>
        </div>
      </section>

      <button
        type="button"
        className="cookie-button"
        onClick={handleCookieClick}
        aria-label="點擊餅乾獲得分數"
      >
        🍪
      </button>

      <section className="upgrades">
        <article className="upgrade-card">
          <h2>豪華餅乾模具</h2>
          <p>讓每次點擊多出一塊香噴噴的餅乾。</p>
          <div className="upgrade-footer">
            <span className="cost">花費：{formatNumber(clickUpgradeCost)}</span>
            <button
              type="button"
              onClick={handleBuyClickUpgrade}
              disabled={cookies < clickUpgradeCost}
            >
              升級點擊力
            </button>
          </div>
        </article>

        <article className="upgrade-card">
          <h2>自動烘焙助手</h2>
          <p>雇用小幫手幫你 24 小時烘烤餅乾！</p>
          <div className="upgrade-footer">
            <span className="cost">花費：{formatNumber(autoClickerCost)}</span>
            <button
              type="button"
              onClick={handleBuyAutoClicker}
              disabled={cookies < autoClickerCost}
            >
              增聘助手 (+1/秒)
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}

export default App
