import { useEffect, useState } from "react"
import './App.css'

export default function App() {
  const [theme, setTheme] = useState("a")

  const styles = {
    a: {
      color: "darkred",
      background: "tomato",
      getBtn() {
        return {
          padding: "10px",
          color: this.color,
          background: this.background,
          borderRadius: "8px",
          textAlign: "center",
        }
      },
      getBorder() {
        return {
          border: `${this.background} 3px solid`
        }
      },
    },
    b: {
      color: "orange",
      background: "dodgerblue",
      getBorder(colorInput) {
        return {
          border: `${colorInput || this.background} 3px solid`
        }
      },
      getBtn() {
        return {
          padding: "20px",
          color: this.color,
          background: this.background,
          borderRadius: "5px",
          textAlign: "center",
          ...this.getBorder("tomato"),
        }
      }
    }
  }

  // experimental
  const structure = {
    elm: {
      type: "div",
      id: "aaa",
      className: "",
      style: { color: "red", background: "black" },
      // content: "testtest",
      elm: {
        type: "div",
        style: styles[theme].getBorder(),
        content: "testtest2",
      }
    },
  }

  const testStructure = (target) => {
    let html = ""
    const div1 = Object.entries(target).map(([key, value]) => {
      if (key === "elm") {
        const { type, id, className, style, content, elm } = value
        if (type === "div") {
          const div2 = Object.entries(value).map(([key, value]) => {
            if (key === "elm") {
              const { type, id, className, style, content, elm } = value
              if (type === "div") {
                return <div id={id} style={style}>{content || "mock text"}</div>
              }
            }
          })

          return (<div id={id} style={style}>{content || div2}</div>)
        }
      }
    })
    return div1[0]
  }

  useEffect(() => {
    const testRes = testStructure(structure)
    console.log(testRes);
  }, [])

  return (
    <>
      <div style={{
        marginBottom: "10px",
        ...styles[theme].getBtn()
      }}>
        btn style from js
      </div>
      <div style={styles[theme].getBorder()}>
        border style from js
      </div>
      <button onClick={() => setTheme("a")}>
        choose theme a
      </button>
      <button onClick={() => setTheme("b")}>
        choose theme b
      </button>
      <div style={{ padding: "10px" }}>
        experimental:
        {testStructure(structure)}
      </div>
    </>
  )
}
