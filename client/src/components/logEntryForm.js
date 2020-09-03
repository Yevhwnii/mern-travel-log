import React from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from '../util/api';

const LogEntryForm = ({ location }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    try {
      data.lat = location.latitude;
      data.lng = location.longitude;
      const created = createLogEntry(data);
      console.log(created);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
      <label htmlFor='title'>Title</label>
      <input ref={register} name='title' required />
      <label htmlFor='comments'>Comments</label>
      <textarea ref={register} name='comments' rows={3}></textarea>
      <label htmlFor='description'>Description</label>
      <textarea ref={register} name='description' rows={3}></textarea>
      <label htmlFor='image'>Image</label>
      <input ref={register} name='image' />
      <label htmlFor='visitDate'>Visit Date</label>
      <input ref={register} name='visitDate' type='date' />
      <button>Create Log Entry</button>
    </form>
  );
};

export default LogEntryForm;
