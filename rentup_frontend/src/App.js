import HomePage from "./core/components/HomePage/HomePage";
import TypePage from "./core/components/TypePage/TypePage";
import PostPage from "./core/components/PostPage/PostPage";
import SigninPage from "./core/components/SigninPage/SigninPage";
import SignupPage from "./core/components/SignupPage/SignupPage";
import ForgetPasswordPage from "./core/components/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "./core/components/ResetPasswordPage/ResetPasswordPage";
import PostDetailPage from "./core/components/PostDetailPage/PostDetailPage";
import ManageHousePage from "./core/components/ManagePage/ManageHousePage";
import ManageRoomPage from "./core/components/ManagePage/ManageRoomPage";
import ManageRentPage from "./core/components/ManagePage/ManageRentPage";
import AddHousePage from "./core/components/AddHousePage/AddHousePage";
import AddRoomPage from "./core/components/AddRoomPage/AddRoomPage";
import EditHousePage from "./core/components/EditHousePage/EditHousePage"
import EditRoomPage from "./core/components/EditRoomPage/EditRoomPage"
import ManageYourRequestPage from "./core/components/ManagePage/ManageYourRequestPage"
import ManageRentRequestPage from "./core/components/ManagePage/ManageRentRequestPage"
import RentRegisterPage from "./core/components/RentRegisterPage/RentRegisterPage"
import ProfilePage from "./core/components/ProfilePage/ProfilePage";
import ChangePasswordPage from "./core/components/ChangePasswordPage/ChangePasswordPage";
import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from "react"
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext)
  
  return (
    <Switch>
        <Route path='/' exact>
            <HomePage />
        </Route>
        <Route path='/type'>
            <TypePage />
        </Route>
        <Route path='/post/:id'>
            <PostDetailPage/>
        </Route>
        <Route path='/post'>
            <PostPage />
        </Route> 
        <Route path='/signin'>
            {authCtx.isLoggedIn && <Redirect to='/'/>}
            {!authCtx.isLoggedIn && <SigninPage />}
        </Route>
        <Route path='/signup'>
            {authCtx.isLoggedIn && <Redirect to='/'/>}
            {!authCtx.isLoggedIn && <SignupPage />}
        </Route>
        <Route path='/forget_password'>
            {authCtx.isLoggedIn && <Redirect to='/'/>}
            {!authCtx.isLoggedIn && <ForgetPasswordPage />}
        </Route>
        <Route path='/reset_password/:token/'>
            {authCtx.isLoggedIn && <Redirect to='/'/>}
            {!authCtx.isLoggedIn && <ResetPasswordPage />}
        </Route>
        <Route path='/change_password/'>
            {!authCtx.isLoggedIn && <Redirect to='/'/>}
            {authCtx.isLoggedIn && <ChangePasswordPage />}
        </Route>
        <Route path='/room/:id/edit'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <EditRoomPage />}
        </Route>
        <Route path='/room/:id/rent_register'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <RentRegisterPage />}
        </Route>
        <Route path='/manage/house/:id/add-room'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <AddRoomPage />}
        </Route>
        <Route path='/manage/house/:id/view'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <ManageRoomPage />}
        </Route>
        <Route path='/manage/house/:id/edit'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <EditHousePage />}
        </Route>
        <Route path='/manage/your_request'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <ManageYourRequestPage />}
        </Route>
        <Route path='/manage/rent_request'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <ManageRentRequestPage />}
        </Route>
        <Route path='/manage/my_rent'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <ManageRentPage />}
        </Route>
        <Route path='/manage'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <ManageHousePage />}
        </Route>
        <Route path='/add-house'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <AddHousePage />}
        </Route>
        <Route path='/profile'>
            {!authCtx.isLoggedIn && <Redirect to='/signin'/>}
            {authCtx.isLoggedIn && <ProfilePage />}
        </Route>
        <Route path='*'>
            <Redirect to='/'/>
        </Route>
    </Switch>
  );
}

export default App;
