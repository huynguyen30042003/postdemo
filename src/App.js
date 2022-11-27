// import { render } from '@testing-library/react'
import { logDOM } from '@testing-library/react';
import {useEffect, useState } from 'react'
import './App.css'
import image from './image.png'

function App() {
  const [countFlow, setCountFLow] = useState(0);
  const [drop,setDrop] =  useState(0);
  const [count, setCount] = useState(0);
  const [value,setValue] = useState('');
  const [list,setList] = useState(JSON.parse(localStorage.getItem('list.post')) ??[])
  const [thuTu,setThuTu] = useState(0);
  const [randomSeed,setRandomSeed] = useState()
  const [randomFlag,setRandomFlag] = useState()
  useEffect(()=>{
    localStorage.setItem("list.post",JSON.stringify(list))
    console.log(JSON.parse(localStorage.getItem("list.post")));
  },[list]) 
  var id=0;
  function handleClick() {
    setCount(count + 1);
    setRandomSeed(Math.floor(Math.random() * 11))
    setRandomFlag(Math.floor(Math.random() * 11))
  }
  const onHandleChange=(e)=>{
    setValue(e.target.value)
  }

  const upList=()=>{
    if (value==''){
      alert("Bạn cần nhập bài viết")
      setCount(count+1)
      return
    }else{

      setThuTu(thuTu+1)
      setList([{id:thuTu,Drop:false,flag:false,note:false,Text:value,totalSeed:randomSeed,totalFlag:randomFlag},...list]);
      setCount(count + 1);
      setValue('')
      console.log(list);
    }
  }
  const handleOnKeyDown=(e)=>{
    if (e.key=='Enter'){
      upList()
    }
  }
  const seeding=(index)=>{
    let check= index
    console.log(check);
    const newList = list.map((post,index) =>{
      if (post.id == check){
        if (post.Drop==post.flag){
          return {
            ...post,
            Drop: true,   
          }}
        else {
          if(post.Drop == false){
            return {
              ...post,
              Drop: true,
              flag: false
            }
          }else{
            
              return {
                ...post,
                Drop: false,
              }
          }
        }
    } else {
      return {
        ...post
      }
    }
    })
    setList(newList)
    console.log(newList); 
  }
  const flagging=(index)=>{
    let check= index
    console.log(check);
    const newList = list.map((post,index) =>{
      if (post.id == check){
        if (post.flag==post.Drop){
          return {
            ...post,
            flag: true,   
          }}
        else {
          if(post.flag == false){
            return {
              ...post,
              flag: true,
              Drop: false
            }
          }else{
            
              return {
                ...post,
                flag: false,
              }
          }
        }
    } else {
      return {
        ...post
      }
    }
    })
    setList(newList)
    console.log(newList); 
  }
  const saving=(index)=>{
    let check= index
    const newList=list.map((post,index)=>{
      if (post.id==check){
        return{
          ...post,
          note: !post.note,
        }
      } else{
        return{
          ...post
        }
      }
      }
    )
      setList(newList)
      console.log(newList);
  }
  return (
    <>
    <div className="post">
      <div className='main'>
        <div className='tableInput' 
        onClick={handleClick}
        >
          <img className='image' src={image}></img>
          <input value={value} className='inputValue' type="text" placeholder="Input...." ></input>
          <div className='icon'>
            <i class="fa-solid fa-file "></i>
            <i class="fa-solid fa-images"></i>
          </div>
        </div>

        {
          list.map((task,index)=>(
          <div className='listPost'>
          <div className='info'>
            <img className='image' src={image}></img>
            <p>Nguyễn Khoa Nhật Huy</p>
            <div className='flag-flow'>
                <a className={(task.Drop!=true)?"":"green"}>{(task.Drop==true)?task.totalSeed+1:(task.totalSeed==0)?'':task.totalSeed}</a>
                <i className={(task.Drop!=true)?"fa-solid fa-seedling":"fa-solid fa-seedling green"}></i>
                <a className={(task.flag!=true)?"":"red"}>{(task.flag==true)?task.totalFlag+1:(task.totalFlag==0)?'':task.totalFlag}</a>
                <i className={(task.flag!=true)?"fa-solid fa-flag":"fa-solid fa-flag red"}></i>
            </div>
          </div>
          <div className='data'>
              {/* <a>Thẻ in đậm text trong CSS là thẻ font-weight. Thẻ này sẽ giúp thay đổi độ mỏng và dày của chữ tùy theo mục đích của lập trình viên. Thẻ font-weight mang lại rất nhiều lựa chọn cho bạn so với thẻ bold và strong trong HTML. Thuộc tính font-weight được hỗ trợ bởi hầu hết các trình duyệt như Chrome, Fi</a> */}
            <a>{task.Text}</a>
          </div>
          <div className='drop' >
            <div className={(task.Drop!=true)?'flow':'flow green'} 
            onClick={()=>seeding(task.id)} 

            >
               {task.Drop}
              <i class="fa-solid fa-seedling"></i>
              <p>seedling</p>
            </div>
            <div className={(task.flag!=true)?'flag':' flow red'}
            onClick={()=>flagging(task.id)}
            >
              {task.flag}
              <i class="fa-solid fa-flag"></i>
              <p>flag</p>
            </div>
            <div className='comment'>
              <i class="fa-solid fa-comments"></i>
              <p>comment</p>
            </div>
            <div className={(task.note!=true)?'save':'save yellow'}
            onClick={()=>saving(task.id)} 
            >
            <i class="fa-solid fa-bookmark" ></i>
              <p>saving</p>
            </div>
          </div>
        </div>
        ))
        } 
       

      </div>
    </div>
    <div className={(count % 2=== 0)?"box-input":"box-input open"}>
      <div className='main-input'>
        <div className='title'>
          <div></div>
          <p>Tạo bài viết</p>
          <i  class="fa-solid fa-circle-xmark"
          onClick={handleClick}></i>
        </div>
        <div className='info'>
            <img className='image' src={image}></img>
            <p>Nguyễn Khoa Nhật Huy</p>
            <div className='flag-flow'>
            </div>
          </div>
        <div className='tab-post'>
          <textarea rows="4" type="text" placeholder='Nội dung bài viết...'
          onChange={(e)=>onHandleChange(e)}
          onKeyDown={(e)=>handleOnKeyDown(e)}
          value={value}
          ></textarea>
        </div>
        <div className='addInput'>
          <button
           onClick={upList}
           >Đăng bài</button>
        </div>
        
      </div>
    </div>
    </>
  );

}

export default App;
