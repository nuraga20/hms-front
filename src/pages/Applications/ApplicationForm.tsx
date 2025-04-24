// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { applicationsData, usersData } from '../../data/sampleData';
// import { Application } from '../../types/hms';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// const ApplicationForm: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const isEditMode = Boolean(id);

//   const [formData, setFormData] = useState({
//     application_id: '',
//     user_id: '',
//     nu_id: '', // Will be fetched automatically
//     roommate_nu_id: '',
//     application_date: new Date().toISOString().split('T')[0],
//     status: 'pending',
//     review_notes: '',
//     roommate_preferences: [] as number[],
//     documents: {
//       self_address: null as File | null,
//       mom_address: null as File | null,
//       dad_address: null as File | null,
//       mom_work: null as File | null,
//       dad_work: null as File | null,
//     },
//   });

//   useEffect(() => {
//     if (isEditMode) {
//       const application = applicationsData.find(
//         (app) => app.application_id === Number(id)
//       );
//       if (application) {
//         setFormData((prev) => ({
//           ...prev,
//           application_id: application.application_id.toString(),
//           user_id: application.user_id.toString(),
//           application_date: new Date(application.application_date)
//             .toISOString()
//             .split('T')[0],
//           status: application.status,
//           review_notes: application.review_notes || '',
//           roommate_preferences: application.roommate_preferences || [],
//         }));
//       }
//     } else {
//       // For new applications, fetch the current user's NUID
//       const currentUser = usersData[0]; // Replace with actual user data fetching
//       if (currentUser) {
//         setFormData((prev) => ({
//           ...prev,
//           nu_id: currentUser.nu_id.toString(),
//         }));
//       }
//     }
//   }, [id, isEditMode]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       setFormData((prev) => ({
//         ...prev,
//         documents: {
//           ...prev.documents,
//           [name]: files[0],
//         },
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Create a new application object
//     const newApplication: Application = {
//       application_id: applicationsData.length + 1, // Generate a new ID
//       user_id: 1, // This should be the current user's ID
//       application_date: new Date(),
//       status: 'pending',
//       roommate_preferences: formData.roommate_nu_id ? [parseInt(formData.roommate_nu_id)] : [],
//       review_notes: '',
//     };

//     // Add the new application to the applicationsData array
//     applicationsData.push(newApplication);

//     // Navigate back to the applications list
//     navigate('/applications/applications');
//   };

//   return (
//     <>
//       <Breadcrumb pageName={isEditMode ? 'Edit Application' : 'Create Application'} />
//       <div className="p-6 bg-white dark:bg-boxdark rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">
//           {isEditMode ? 'Edit Application' : 'Create Application'}
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* NUID Field (Read-only) */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">NUID</label>
//             <input
//               type="text"
//               name="nu_id"
//               value={formData.nu_id}
//               readOnly
//               className="w-full rounded border border-stroke py-2 px-3 bg-gray-100"
//             />
//           </div>

//           {/* Roommate NUID Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Preferred Roommate NUID</label>
//             <input
//               type="text"
//               name="roommate_nu_id"
//               value={formData.roommate_nu_id}
//               onChange={handleChange}
//               className="w-full rounded border border-stroke py-2 px-3"
//               placeholder="Enter Roommate's NUID"
//             />
//           </div>

//           {/* Document Uploads */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-black dark:text-white">Required Documents</h3>
            
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               {/* Self Address Document */}
//               <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-black dark:text-white">Self Address Document</label>
//                   <span className="text-xs text-meta-1">*</span>
//                 </div>
//                 <div className="mt-2">
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-boxdark-2 hover:bg-gray-100 dark:hover:bg-boxdark-3 border-stroke dark:border-strokedark">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 2MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         name="self_address"
//                         onChange={handleFileChange}
//                         accept=".pdf"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {formData.documents.self_address && (
//                     <div className="mt-2 flex items-center justify-between text-sm text-black dark:text-white">
//                       <span>{formData.documents.self_address.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({
//                           ...prev,
//                           documents: { ...prev.documents, self_address: null }
//                         }))}
//                         className="text-danger hover:text-danger-dark"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Mom's Address Document */}
//               <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-black dark:text-white">Mother's Address Document</label>
//                   <span className="text-xs text-meta-1">*</span>
//                 </div>
//                 <div className="mt-2">
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-boxdark-2 hover:bg-gray-100 dark:hover:bg-boxdark-3 border-stroke dark:border-strokedark">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 2MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         name="mom_address"
//                         onChange={handleFileChange}
//                         accept=".pdf"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {formData.documents.mom_address && (
//                     <div className="mt-2 flex items-center justify-between text-sm text-black dark:text-white">
//                       <span>{formData.documents.mom_address.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({
//                           ...prev,
//                           documents: { ...prev.documents, mom_address: null }
//                         }))}
//                         className="text-danger hover:text-danger-dark"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Dad's Address Document */}
//               <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-black dark:text-white">Father's Address Document</label>
//                   <span className="text-xs text-meta-1">*</span>
//                 </div>
//                 <div className="mt-2">
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-boxdark-2 hover:bg-gray-100 dark:hover:bg-boxdark-3 border-stroke dark:border-strokedark">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 2MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         name="dad_address"
//                         onChange={handleFileChange}
//                         accept=".pdf"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {formData.documents.dad_address && (
//                     <div className="mt-2 flex items-center justify-between text-sm text-black dark:text-white">
//                       <span>{formData.documents.dad_address.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({
//                           ...prev,
//                           documents: { ...prev.documents, dad_address: null }
//                         }))}
//                         className="text-danger hover:text-danger-dark"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Mom's Work Certificate */}
//               <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-black dark:text-white">Mother's Work Certificate</label>
//                   <span className="text-xs text-meta-1">*</span>
//                 </div>
//                 <div className="mt-2">
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-boxdark-2 hover:bg-gray-100 dark:hover:bg-boxdark-3 border-stroke dark:border-strokedark">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 2MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         name="mom_work"
//                         onChange={handleFileChange}
//                         accept=".pdf"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {formData.documents.mom_work && (
//                     <div className="mt-2 flex items-center justify-between text-sm text-black dark:text-white">
//                       <span>{formData.documents.mom_work.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({
//                           ...prev,
//                           documents: { ...prev.documents, mom_work: null }
//                         }))}
//                         className="text-danger hover:text-danger-dark"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Dad's Work Certificate */}
//               <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-medium text-black dark:text-white">Father's Work Certificate</label>
//                   <span className="text-xs text-meta-1">*</span>
//                 </div>
//                 <div className="mt-2">
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-boxdark-2 hover:bg-gray-100 dark:hover:bg-boxdark-3 border-stroke dark:border-strokedark">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 2MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         name="dad_work"
//                         onChange={handleFileChange}
//                         accept=".pdf"
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {formData.documents.dad_work && (
//                     <div className="mt-2 flex items-center justify-between text-sm text-black dark:text-white">
//                       <span>{formData.documents.dad_work.name}</span>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({
//                           ...prev,
//                           documents: { ...prev.documents, dad_work: null }
//                         }))}
//                         className="text-danger hover:text-danger-dark"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
//           >
//             {isEditMode ? 'Update' : 'Create'}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ApplicationForm;