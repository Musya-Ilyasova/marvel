import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// предохранители ловят ошибки в методе рендер, методах жизненного цикла и в конструкторах дочерних компонентов
// не ловят внутри обработчиков событий, асинхронном коде и в самом предохранителе
class ErrorBoundary extends Component {
  state = {
    error: false
  }
  // данный метод только обновляет стейт
  static getDerivedStateFromError(error) {
    return {error: true}
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    })
  }

  render() {
    if(this.state.error) {
      return <ErrorMessage/>
    }
    return this.props.children
  }
}

export default ErrorBoundary;
